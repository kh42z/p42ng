# frozen_string_literal: true

class ChatMessageSerializer < ActiveModel::Serializer
  attributes :id,
             :sender_id,
             :content,
             :created_at
end
