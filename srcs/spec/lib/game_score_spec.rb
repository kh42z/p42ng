require 'rails_helper'
include(ScoreHelper)

RSpec.describe ScoreHelper do
  describe '#game_point_assignment' do
    context 'if user has a guild' do
      let(:bang) { create(:guild) }
      let(:nos) { create(:guild) }
      let(:tom) { create(:user, nickname: 'tom') }
      let(:alan) { create(:user, nickname: 'alan') }
      let(:game) { create(:game, player_left: tom, player_right: alan, winner: tom) }
      let(:attributes) { { from: nos.id, on: bang.id, war_start: DateTime.now, war_end: DateTime.new(2022, 01, 01, 00, 00, 0), prize: 1000, max_unanswered: 10, from_score: 0, on_score: 0 } }
      before {
        create(:guild_member, user: tom, guild: bang, rank: 'owner')
        create(:guild_member, user: alan, guild: nos, rank: 'owner')
      }
      it 'should assign points to guild score' do
        expect{ game_point_assignment(game) }.to change{ Guild.first.score }.by(10)
      end
      context 'in war and duels a war enemy' do
        before { create(:war, attributes) }
        it 'should assign point to war score', test:true do
          expect{ game_point_assignment(game) }.to change{ War.first.on_score }.by(10)
        end
      end
    end
  end
end
