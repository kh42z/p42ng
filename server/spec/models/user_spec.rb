# frozen_string_literal: true

require 'rails_helper'

RSpec.describe User, type: :model do
  it { should validate_presence_of(:nickname) }
  it { should validate_presence_of(:image_url) }
  it { should allow_values(true, false).for(:two_factor) }
  it { should validate_presence_of(:ladder_games_won) }
  it { should validate_presence_of(:ladder_games_lost) }
  it { should belong_to(:ladder) }
  it { should belong_to(:guild) }
  it { should validate_presence_of(:status) }
end
