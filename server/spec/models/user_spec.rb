# frozen_string_literal: true

require 'rails_helper'

RSpec.describe User, type: :model do
  it { should validate_presence_of(:nickname) }
  it { should validate_presence_of(:image_url) }
  it { should allow_values(true, false).for(:two_factor) }
  it { should allow_values(true, false).for(:first_login) }
  it { should allow_values(true, false).for(:admin) }
  it { should allow_values(true, false).for(:banned) }
  it { should allow_values('offline', 'online', 'ingame').for(:status) }
  it { should validate_presence_of(:ladder_games_won) }
  it { should validate_presence_of(:ladder_games_lost) }
  it { should belong_to(:ladder) }
  it { should belong_to(:guild) }
  it { should have_one(:guild_officer).dependent(:destroy) }
  it { should have_many(:chat_participant).dependent(:destroy) }
  it { should have_many(:chats).dependent(:destroy) }
  it { should have_many(:chat_admin).dependent(:destroy) }
  it { should have_many(:ignores).dependent(:destroy) }

  it "validates uniqueness of nickname" do
    create(:user, nickname: 'unique name')
    should validate_uniqueness_of(:nickname)
  end

end
