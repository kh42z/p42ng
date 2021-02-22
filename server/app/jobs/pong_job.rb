# frozen_string_literal: true

class PongJob < ApplicationJob
  queue_as :default

  def perform(*args); end
end
