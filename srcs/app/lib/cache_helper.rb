# frozen_string_literal: true

module CacheHelper
  TIMEOUT_KEY_PREFIX = 'timeout_chat_'

  BAN_KEY_PREFIX = 'ban_chat_'

  def user_banned_from_chat?(chat_id, user_id)
    Rails.cache.exist?(CacheHelper::BAN_KEY_PREFIX + "#{chat_id}_#{user_id}")
  end

  def ban_user_from_chat(chat_id, user_id, duration)
    Rails.cache.write(CacheHelper::BAN_KEY_PREFIX + "#{chat_id}_#{user_id}", 0,
                      expires_in: duration.to_i.seconds)
  end

  def timeout_user_from_chat(chat_id, user_id, duration)
    Rails.cache.write(CacheHelper::TIMEOUT_KEY_PREFIX + "#{chat_id}_#{user_id}", 0,
                      expires_in: duration.to_i.seconds)
  end

  def user_timeout_from_chat?(chat_id, user_id)
    Rails.cache.exist?(CacheHelper::TIMEOUT_KEY_PREFIX + "#{chat_id}_#{user_id}")
  end
end
