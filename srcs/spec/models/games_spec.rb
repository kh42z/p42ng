# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Game, type: :model do
  it { should belong_to(:winner) }
  it { should belong_to(:player_left) }
  it { should belong_to(:player_right) }
  it { should validate_presence_of(:connected_players) }
  it { should allow_values('duel', 'ladder', 'tournament').for(:mode) }
  it { should allow_values('pending', 'inprogress', 'played').for(:status) }

  it 'should not validate if mode == war and no war_time_id' do
    expect { create(:game, mode: 'war') }.to raise_error(ActiveRecord::RecordInvalid, "Validation failed: War time can't be blank")
  end
  it 'should validate if mode != war and no war_time_id' do
    expect { create(:game, mode: 'duel') }.to_not raise_error
  end
end
