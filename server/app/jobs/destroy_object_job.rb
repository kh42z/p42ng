# frozen_string_literal: true

class DestroyObjectJob < ApplicationJob
  queue_as :default

  def perform(ban)
    ban.destroy
  end
end
