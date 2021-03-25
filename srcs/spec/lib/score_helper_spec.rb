# frozen_string_literal: true

require 'rails_helper'
include(ScoreHelper)

RSpec.describe GamePoints do
  let(:gp) { GamePoints.new }
  let!(:tom) { create(:user, nickname: 'tom', ladder_games_lost: 0, ladder_games_won: 0) }
  let!(:alan) { create(:user, nickname: 'alan', ladder_games_lost: 0, ladder_games_won: 0) }
  let!(:ladder_game) { create(:game, player_left: tom, player_right: alan, winner: tom, status: 'played', mode: 'ladder') }
  let!(:ladder_game_2) { create(:game, player_left: tom, player_right: alan, winner: alan, status: 'played', mode: 'ladder') }
  context 'Ladder' do
    it "increments Tom's ladder games won/lost",test:true do
      gp.game_points(ladder_game)
      expect(User.find_by_nickname('tom').ladder_games_won).to eq 1
      expect(User.find_by_nickname('alan').ladder_games_lost).to eq 1
      expect(User.find_by_nickname('tom').ladder_games_lost).to eq 0
      expect(User.find_by_nickname('alan').ladder_games_won).to eq 0
    end
    it "increments Alan's ladder games won/lost" do
      gp.game_points(ladder_game_2)
      expect(User.find_by_nickname('alan').ladder_games_won).to eq 1
      expect(User.find_by_nickname('tom').ladder_games_lost).to eq 1
      expect(User.find_by_nickname('alan').ladder_games_lost).to eq 0
      expect(User.find_by_nickname('tom').ladder_games_won).to eq 0
    end
  end
  context 'User has a guild' do
    let!(:duel_game) { create(:game, player_left: tom, player_right: alan, winner: tom, status: 'played') }
    let!(:duel_game_2) { create(:game, player_left: tom, player_right: alan, winner: alan, status: 'played') }
    let(:bang) { create(:guild, name: 'BANG', score: 0) }
    let(:nos) { create(:guild, name: 'NOS', score: 0) }
    before do
      create(:guild_member, user: tom, guild: bang, rank: 'owner')
      create(:guild_member, user: alan, guild: nos, rank: 'owner')
    end
    it "gives points to Tom's guild" do
      expect { gp.game_points(duel_game) }.to change { Guild.first.score }.by(10)
    end
    it "gives points to Alan's guild" do
      expect { gp.game_points(duel_game_2) }.to change { Guild.last.score }.by(10)
    end
    context 'At war' do
      before do
        create(:war, from: nos, on: bang, war_start: DateTime.now, war_end: DateTime.new(2022), prize: 1000, max_unanswered: 10, opened: true, from_score: 0, on_score: 0)
      end
      context 'in a duel game' do
        it "gives points to winner's guild (side_on)" do
          expect { gp.game_points(duel_game) }.to change { War.first.on_score }.by(10)
        end
        it "gives points to winner's guild (side_from)" do
          expect { gp.game_points(duel_game_2) }.to change { War.first.from_score }.by(10)
        end
      end
      context "with ladder_effort" do
        let(:user) { create(:user, ladder_games_lost: 0, ladder_games_won: 0) }
        it "at false gives no points" do
          gp.game_points(ladder_game)
          expect(War.first.on_score).to eq 0
          expect(War.first.from_score).to eq 0
        end
        it "at true gives points" do
          create(:war, from: bang, on: nos, war_start: DateTime.now, war_end: DateTime.new(2022), prize: 1000, max_unanswered: 10, opened: true, from_score: 0, on_score: 0)
          War.first.toggle!(:ladder_effort)
          War.last.toggle!(:ladder_effort)
          gp.game_points(ladder_game)
          expect(War.first.from_score).to eq 0
          expect(War.first.on_score).to eq 10
          expect(War.last.from_score).to eq 10
          expect(War.last.on_score).to eq 0
        end
      end
    end
  end
end
