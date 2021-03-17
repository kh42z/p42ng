# frozen_string_literal: true

require 'rails_helper'

RSpec.describe UserAchievement, type: :model do
  it 'should have correct association' do
    should belong_to(:achievement)
    should belong_to(:user)
  end
end
