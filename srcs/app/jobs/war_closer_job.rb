# frozen_string_literal: true

class WarCloserJob < ApplicationJob
  queue_as :default

  def perform(war)
    war.update!(opened: false, closed: true)
  end
end
