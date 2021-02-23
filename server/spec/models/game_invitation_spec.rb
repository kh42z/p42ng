require 'rails_helper'

RSpec.describe GameInvitation, type: :model do
  it { should belong_to(:player1) }
  it { should belong_to(:player2) }
  it { should belong_to(:game_type) }
  it { should validate_presence_of(:from) }
end
