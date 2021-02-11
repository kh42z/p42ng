# frozen_string_literal: true

class ChatSerializer < ActiveModel::Serializer
  attributes :id, :owner_id, :privacy
end
