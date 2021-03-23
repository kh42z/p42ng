# frozen_string_literal: true

class WarTimeCloserJob < ApplicationJob
  queue_as :default

  def perform(wartime)
    wartime.update!(opened: false, closed: true)
  end
end
