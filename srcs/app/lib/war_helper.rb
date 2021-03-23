# frozen_string_literal: true

module WarHelper
  def war_opened_side_help(guild_a, guild_b)
    War.where(from: guild_a, on: guild_b, opened: true).or(War.where(from: guild_b, on: guild_a, opened: true)).first
  end
end
