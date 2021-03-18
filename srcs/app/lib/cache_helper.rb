# frozen_string_literal: true

module CacheHelper
  TIMEOUT_KEY_PREFIX = 'timeout_chat_'
  BAN_KEY_PREFIX = 'ban_chat_'
  GUILD_INVITE_KEY_PREFIX = 'pending_invite_'
  GE_PADDLE_POSITION = 'game_engine_paddle_pos_'
  GE_STOP = 'game_engine_stop_'

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

  def guild_invite_user(guild_id, user_id)
    Rails.cache.write(CacheHelper::GUILD_INVITE_KEY_PREFIX + "#{guild_id}_#{user_id}", 0)
  end

  def guild_pending_invitation?(guild_id, user_id)
    Rails.cache.exist?(CacheHelper::GUILD_INVITE_KEY_PREFIX + "#{guild_id}_#{user_id}")
  end

  def guild_delete_invitation(guild_id, user_id)
    Rails.cache.delete(CacheHelper::GUILD_INVITE_KEY_PREFIX + "#{guild_id}_#{user_id}")
  end

  def game_set_paddle_pos(game_id, user_id, pos)
    Rails.cache.write(CacheHelper::GE_PADDLE_POSITION + "#{game_id}_#{user_id}", pos)
  end

  def game_get_paddle_pos(game_id, user_id)
    Rails.cache.fetch(CacheHelper::GE_PADDLE_POSITION + "#{game_id}_#{user_id}") do
      return 128
    end
  end
end
