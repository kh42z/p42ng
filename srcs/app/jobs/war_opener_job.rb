# frozen_string_literal: true

class WarOpenerJob < ApplicationJob
  queue_as :default

  def perform(war)
    war.update!(opened: true)
  end
end
