# frozen_string_literal: true

require "rails_helper"

RSpec.describe "Users", type: :request do
  let!(:users) { create_list(:user, 5) }
  let!(:first) { users.first }
  let!(:user_id) { users.last.id }

  describe "requires auth token" do
    before do
      get "/api/users"
    end
    it "returns status code 401" do
      expect(response).to have_http_status(401)
      expect(json).not_to be_empty
    end
  end

  describe "retrieves all users" do
    context "asking for all users" do
      before do
        get "/api/users", headers: first.create_new_auth_token
      end
      it "returns users" do
        expect(json.size).to eq(5)
        expect(response).to have_http_status(200)
      end
    end
    context "search with status" do
      before do
        User.first.update(status: 'online')
        get "/api/users", headers: first.create_new_auth_token, params: {status: 'online'}
      end
      it "returns users" do
        expect(json.size).to eq(1)
        expect(response).to have_http_status(200)
      end
    end

    context "search with ladder" do
      before do
        ladder = Ladder.create(name: "Bronze")
        User.first.update(ladder_id: ladder.id)
        get "/api/users", headers: first.create_new_auth_token, params: {ladder_id: ladder.id}
      end
      it "returns users" do
        expect(json.size).to eq(1)
        expect(response).to have_http_status(200)
      end
    end

    context "search with guild_id" do
      before do
        guild = create(:guild)
        GuildMember.create(guild: guild, user: first)
        get "/api/users", headers: first.create_new_auth_token, params: {guild_id: guild.id}
      end
      it "returns users" do
        expect(json.size).to eq(1)
        expect(response).to have_http_status(200)
      end
    end
  end

  describe "retrieves one user" do
    before do
      Friendship.create(friend_a: users.last , friend_b: first)
      get "/api/users/#{user_id}", headers: first.create_new_auth_token
    end
    it "returns user" do
      expect(json).not_to be_empty
      expect(response).to have_http_status(200)
      expect(json['friends'][0]['friend_id']).to eq(first.id)
    end
  end

  describe "it upload an avatar" do
    it 'attaches the uploaded file' do
      file = fixture_file_upload(Rails.root.join('public', 'images', 'profile-pic.jpg'), 'image/jpg')
      expect {
        post "/api/users/#{user_id}/avatar", headers: users.last.create_new_auth_token, params: { avatar: file }
      }.to change(ActiveStorage::Attachment, :count).by(1)
    end
  end

  describe "modifies one user" do
    context "when the request is valid" do
      before do
        patch "/api/users/#{user_id}", params: { user: {"nickname" => "Michel"}}, headers: users.last.create_new_auth_token
      end
      it "update user" do
        expect(json).not_to be_empty
        expect(response).to have_http_status(200)
      end

    end
    context "when the user is not unique" do
      before do
        User.first.update(nickname: "Gertrude")
        patch "/api/users/#{user_id}", params: {user: {"nickname" => "Gertrude"}}, headers: users.last.create_new_auth_token
      end
      it "returns status code 422" do
        expect(response).to have_http_status(422)
        expect(json).not_to be_empty
      end
    end


    context "when the user is trying to modify someone else" do
      before do
        patch "/api/users/#{first.id}", params: { user: {"nickname" => "Michel"}}, headers: users.last.create_new_auth_token
      end
      it "returns status code 403" do
        expect(response).to have_http_status(401)
      end
    end

    context "when the user is trying to ban himself" do
      before do
        patch "/api/users/#{first.id}", params: { user: {banned: true}}, headers: users.last.create_new_auth_token
      end
      it "returns status code 403" do
        expect(response).to have_http_status(401)
      end
    end

    context "when admins bans an user" do
      before do
        users.last.update(admin: true)
        patch "/api/users/#{first.id}", params: { user: {banned: true}}, headers: users.last.create_new_auth_token
      end
      it "returns status code 200" do
        expect(response).to have_http_status(200)
        expect(json).not_to be_empty
      end
    end

    context "when admin modifies someone else" do
      before do
        users.last.update(admin: true)
        patch "/api/users/#{first.id}", params: { user: {"nickname" => "George"}}, headers: users.last.create_new_auth_token
      end
      it "returns status code 200" do
        expect(response).to have_http_status(200)
        expect(json).not_to be_empty
      end
    end
  end

  describe "#ignores", test: true do
    let(:user) { create(:user) }
    let(:auth) { create(:user) }
    let(:access_token) { auth.create_new_auth_token }
    it "should ignore a user" do
      post "/api/users/#{auth.id}/ignores", params: { ignored_id: user.id.to_i }, headers: access_token
      expect(response).to have_http_status(200)
      expect(UserIgnore.count).to eq(1)
      expect(json['ignored_id']).to eq(user.id)
    end
    it "should stop ignoring a user" do
      post "/api/users/#{auth.id}/ignores", params: { ignored_id: user.id.to_i }, headers: access_token
      expect(UserIgnore.count).to eq(1)
      delete "/api/users/#{auth.id}/ignores/#{user.id}", headers: access_token
      expect(response).to have_http_status(204)
      expect(UserIgnore.count).to eq(0)
    end
  end


  describe "#friends", test: true do
    let(:user) { create(:user) }
    let(:auth) { create(:user) }
    let(:access_token) { auth.create_new_auth_token }
    it "should create a friendship" do
      post "/api/users/#{auth.id}/friends", params: { friend_id: user.id.to_i }, headers: access_token
      expect(response).to have_http_status(200)
      expect(Friendship.count).to eq(1)
      expect(json['friend_id'].to_i).to eq(user.id)
      # unicity
      post "/api/users/#{auth.id}/friends", params: { friend_id: user.id.to_i }, headers: access_token
      expect(response).to have_http_status(422)

    end
    it "should delete a friendship" do
      Friendship.create!(friend_a: user, friend_b_id: auth.id)
      delete "/api/users/#{auth.id}/friends/#{user.id}", headers: access_token
      expect(response).to have_http_status(204)
      expect(Friendship.count).to eq(0)
    end
  end

end
