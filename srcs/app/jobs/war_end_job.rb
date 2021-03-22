# frozen_string_literal: true

class WarEndJob < ApplicationJob
  queue_as :default

  def perform(war)
    war.update!(war_closed: true)
  end
end
