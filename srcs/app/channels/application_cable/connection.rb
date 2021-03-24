# frozen_string_literal: true

module ApplicationCable
  class Connection < ActionCable::Connection::Base
    include(CacheHelper)
    identified_by :current_user

    def connect
      self.current_user = find_verified_user
    end

    def disconnect
      return if current_user.nil?

      actioncable_set_user_disconnected(current_user.id)
    end

    protected

    def find_verified_user
      set_expected_names

      uid = get_var(@uid_name)
      token = get_var(@access_token_name)
      client_id = get_var(@client_name)

      authenticate(uid, token, client_id)
    end

    def get_var(name)
      request.headers[name] || request.params[name]
    end

    def set_expected_names
      @uid_name = DeviseTokenAuth.headers_names[:uid]
      @access_token_name = DeviseTokenAuth.headers_names[:'access-token']
      @client_name = DeviseTokenAuth.headers_names[:client]
    end

    def authenticate(uid, token, client_id)
      user = User.find_by_uid(uid)
      return reject_unauthorized_connection if user.nil?
      return reject_unauthorized_connection if actioncable_is_user_connected?(user.id)
      return reject_unauthorized_connection if user&.valid_token?(token, client_id) == false

      actioncable_set_user_connected(user.id)
      user
    end
  end
end
