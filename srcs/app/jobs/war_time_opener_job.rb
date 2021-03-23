# frozen_string_literal: true

class WarTimeOpenerJob < ApplicationJob
  queue_as :default

  def perform(wartime)
    wartime.update!(opened: true)
  end
end
