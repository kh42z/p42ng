# frozen_string_literal: true

require 'rails_helper'

RSpec.describe User, type: :model do
  it { should validate_presence_of(:nickname) }
  it { should validate_presence_of(:image_url) }
  it { should allow_values(true, false).for(:two_factor) }
  it { should allow_values(true, false).for(:first_login) }
  it { should validate_presence_of(:ladder_games_won) }
  it { should validate_presence_of(:ladder_games_lost) }
  it { should belong_to(:ladder) }
  it { should belong_to(:guild) }
  it { should belong_to(:state) }

  it "has none to begin with" do
    expect(User.count).to eq 0
  end
  it "has one after adding one" do
    FactoryBot.create(:user)
    expect(User.count).to eq 1
  end
  it "has none after one was created in a previous example" do
    expect(User.count).to eq 0
  end

  it "validates uniqueness of nickname" do
    FactoryBot.create(:user, nickname: 'unique name')
    should validate_uniqueness_of(:nickname)
  end
end
