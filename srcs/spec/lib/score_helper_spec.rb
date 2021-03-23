# frozen_string_literal: true

require 'rails_helper'
include(ScoreHelper)

RSpec.describe ScoreHelper do
  describe '#game_point_assignment' do
    context 'if user has a guild' do
      let(:bang) { create(:guild) }
      let(:nos) { create(:guild) }
      let(:tom) { create(:user, nickname: 'tom') }
      let(:alan) { create(:user, nickname: 'alan') }
      let(:game) { create(:game, player_left: tom, player_right: alan, winner: tom, status: 'played') }
      let(:game_2) { create(:game, player_left: tom, player_right: alan, winner: alan, status: 'played') }
      before do
        create(:guild_member, user: tom, guild: bang, rank: 'owner')
        create(:guild_member, user: alan, guild: nos, rank: 'owner')
      end
      it 'should assign points to Tom guild' do
        expect { game_point_assignment(game) }.to change { Guild.first.score }.by(10)
      end
      it 'should assign points to Alan guild' do
        expect { game_point_assignment(game_2) }.to change { Guild.last.score }.by(10)
      end
      context 'War duel' do
        before do
          attributes = { from: nos.id, on: bang.id, war_start: DateTime.now, war_end: DateTime.new(2022), prize: 1000, max_unanswered: 10, opened: true}
          create(:war, attributes)
        end
        it "should assign point to winner's guild (side_on)" do
          expect { game_point_assignment(game) }.to change { War.first.on_score }.by(10)
        end
        it "should assign point to winner's guild (side_from)" do
          expect { game_point_assignment(game_2) }.to change { War.first.from_score }.by(10)
        end
      end
    end
  end
end
