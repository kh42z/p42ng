# frozen_string_literal: true

require "rails_helper"

RSpec.describe "Users", type: :request do
  let(:auth) { create(:user) }
  let(:user) { create(:user) }
  let(:users) { create_list(:user, 3) }

  describe "requires auth token" do
    it "returns status code 401" do
      get "/api/users"
      expect(response).to have_http_status(401)
      expect(json).not_to be_empty
    end
  end

  describe "retrieves all users" do
    context "asking for all users" do
      it "returns users" do
        get "/api/users", headers: users.first.create_new_auth_token
        expect(json.size).to eq(3)
        expect(response).to have_http_status(200)
      end
    end
    context "search with status" do
      it "returns users" do
        users.first.update(status: 'online')
        get "/api/users", headers: users.last.create_new_auth_token, params: {status: 'online'}
        expect(json.size).to eq(1)
        expect(response).to have_http_status(200)
      end
    end

    context "search with ladder" do
      before do
        ladder = Ladder.create(name: "Bronze")
        users.first.update(ladder_id: ladder.id)
        get "/api/users", headers: users.first.create_new_auth_token, params: {ladder_id: ladder.id}
      end
      it "returns users" do
        expect(json.size).to eq(1)
        expect(response).to have_http_status(200)
      end
    end

    context "search with guild_id" do
      before do
        guild = create(:guild)
        GuildMember.create(guild: guild, user: auth)
        get "/api/users", headers: users.first.create_new_auth_token, params: {guild_id: guild.id}
      end
      it "returns users" do
        expect(json.size).to eq(1)
        expect(response).to have_http_status(200)
      end
    end
  end

  describe "retrieves one" do
    it 'existing user' do
      Friendship.create(user: user, friend: auth)
      get "/api/users/#{user.id}", headers: auth.create_new_auth_token
      expect(json).not_to be_empty
      expect(response).to have_http_status(200)
      expect(json['friends'][0]['friend_id']).to eq(auth.id)
    end

    it 'missing user' do
      get "/api/users/100", headers: auth.create_new_auth_token
      expect(json).not_to be_empty
      expect(response).to have_http_status(404)
    end
  end

  describe "avatar" do
    before do
      @file = fixture_file_upload(Rails.root.join('public', 'images', 'profile-pic.jpg'), 'image/jpg')
      auth.avatar.purge
    end
    it 'attaches the uploaded file' do
      expect {
        post "/api/users/#{auth.id}/avatar", params: { avatar: @file }, headers: auth.create_new_auth_token
      }.to change(ActiveStorage::Attachment, :count).by(1)
      get "/api/users/#{auth.id}", headers: auth.create_new_auth_token
      expect(json['image_url']).to_not be_empty
    end

    it 'failed to uploaded file if avatar is missing' do
      headers = auth.create_new_auth_token
      post "/api/users/#{auth.id}/avatar", headers:  headers
      expect(response).to have_http_status(422)
    end
  end

  describe "modifies one user" do
    context "when the request is valid" do
      before do
        patch "/api/users/#{user.id}", params: { user: {"nickname" => "Michel"}}, headers: user.create_new_auth_token
      end
      it "update user" do
        expect(json).not_to be_empty
        expect(response).to have_http_status(200)
      end

    end
    context "when the user is not unique" do
      before do
        users.first.update(nickname: "Gertrude")
        patch "/api/users/#{auth.id}", params: {user: {"nickname" => "Gertrude"}}, headers: auth.create_new_auth_token
      end
      it "returns status code 422" do
        expect(response).to have_http_status(422)
        expect(json).not_to be_empty
      end
    end


    context "when the user is trying to modify someone else" do
      before do
        patch "/api/users/#{user.id}", params: { user: {"nickname" => "Michel"}}, headers: auth.create_new_auth_token
      end
      it "returns status code 403" do
        expect(response).to have_http_status(403)
      end
    end

    context "when the user is trying to ban himself" do
      before do
        auth.update(admin: true)
        patch "/api/users/#{auth.id}", params: { user: {banned: true}}, headers: auth.create_new_auth_token
      end
      it "returns status code 403" do
        expect(response).to have_http_status(403)
      end
    end

    context "when admins bans an user" do
      before do
        auth.update(admin: true)
        patch "/api/users/#{user.id}", params: { user: {banned: true}}, headers: auth.create_new_auth_token
      end
      it "returns status code 200" do
        expect(response).to have_http_status(200)
        expect(json).not_to be_empty
        user.reload
        expect(user.banned).to eq(true)
      end
    end

    context "when admin modifies someone else" do
      before do
        auth.update(admin: true)
        patch "/api/users/#{user.id}", params: { user: {"nickname" => "George"}}, headers: auth.create_new_auth_token
      end
      it "returns status code 200" do
        expect(response).to have_http_status(200)
        expect(json).not_to be_empty
      end
    end
  end

  describe "#ignores", test: true do
    let(:access_token) { auth.create_new_auth_token }
    it "should ignore a user" do
      post "/api/users/#{auth.id}/ignores", params: { ignored_id: user.id.to_i }, headers: access_token
      expect(response).to have_http_status(201)
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
    let(:access_token) { auth.create_new_auth_token }
    it "should create a friendship" do
      post "/api/users/#{auth.id}/friends", params: { friend_id: user.id.to_i }, headers: access_token
      expect(response).to have_http_status(201)
      expect(Friendship.count).to eq(1)
      expect(json['friend_id'].to_i).to eq(user.id)
      # unicity
      post "/api/users/#{auth.id}/friends", params: { friend_id: user.id.to_i }, headers: access_token
      expect(response).to have_http_status(422)

    end
    it "should delete a friendship" do
      Friendship.create!(user: auth, friend_id: user.id)
      delete "/api/users/#{auth.id}/friends/#{user.id}", headers: access_token
      expect(response).to have_http_status(204)
      expect(Friendship.count).to eq(0)
    end
  end
end
