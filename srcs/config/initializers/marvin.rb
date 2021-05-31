# frozen_string_literal: true

OmniAuth::Strategies::Marvin.class_eval do
  def callback_url
    full_host + script_name + callback_path
  end
end
