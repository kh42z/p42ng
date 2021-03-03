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
    end
  end

  describe "retrieves all users" do
    context "asking for all users" do
      before do
        get "/api/users", headers: first.create_new_auth_token
      end
      it "returns users" do
        expect(json).not_to be_empty
        expect(json.size).to eq(5)
      end
      it "returns status code 200" do
        expect(response).to have_http_status(200)
      end
    end
    context "search with status" do
      before do
        User.first.update(status: 'online')
        get "/api/users", headers: first.create_new_auth_token, params: {status: 'online'}
      end
      it "returns users" do
        expect(json).not_to be_empty
        expect(json.size).to eq(1)
      end
      it "returns status code 200" do
        expect(response).to have_http_status(200)
      end
    end
  end

  describe "retrieves one user" do
    before do
      get "/api/users/#{user_id}", headers: first.create_new_auth_token
    end
    it "returns user" do
      expect(json).not_to be_empty
    end

    it "returns status code 200" do
      expect(response).to have_http_status(200)
    end
  end

  describe "modifies one user" do
    context "when the request is valid" do
      before do
        patch "/api/users/#{user_id}", params: { user: {"nickname" => "Michel"}}, headers: users.last.create_new_auth_token
      end
      it "update user" do
        expect(json).not_to be_empty
      end

      it "returns status code 200" do
        expect(response).to have_http_status(200)
      end
    end
    context "when the user is not unique" do
      before do
        User.first.update(nickname: "Gertrude")
        patch "/api/users/#{user_id}", params: { user:  {"nickname" => "Gertrude"}}, headers: users.last.create_new_auth_token
      end
      it "returns status code 422" do
        expect(response).to have_http_status(422)
      end
    end

    context "when he leaves a guild" do
      before do
        guild = FactoryBot.create(:guild, owner: users.last)
        users.last.update!(guild: guild)
        patch "/api/users/#{user_id}", params: { user: {"guild_id" => nil }}, headers: users.last.create_new_auth_token
      end
      it "returns 200" do
        expect(response).to have_http_status(200)
        users.last.reload
        expect(users.last.guild).to be_nil
      end
    end

    context "when the user is trying to modify someone else" do
      before do
        patch "/api/users/#{first.id}", params: {"nickname" => "Michel"}, headers: users.last.create_new_auth_token
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
      end
    end

    context "when admin modifies someone else" do
      before do
        users.last.update(admin: true)
        patch "/api/users/#{first.id}", params: { user: {"nickname" => "George"}}, headers: users.last.create_new_auth_token
      end
      it "returns status code 200" do
        expect(response).to have_http_status(200)
      end
    end
  end

  describe "#ignores", test: true do
    let(:user) { create(:user) }
    let(:auth) { create(:user) }
    let(:access_token) { auth.create_new_auth_token }
    it "should ignore a user" do
      post "/api/users/#{auth.id}/ignores", headers: access_token
      expect(response).to have_http_status(200)
      expect(UserIgnore.count).to eq(1)
      expect(UserIgnore.first.user_ignored_id).to eq(auth.id)
    end
    it "should stop ignoring a user" do
      post "/api/users/#{auth.id}/ignores", headers: access_token
      expect(UserIgnore.count).to eq(1)
      delete "/api/users/#{auth.id}/ignores", headers: access_token
      expect(response).to have_http_status(204)
      expect(UserIgnore.count).to eq(0)
    end
  end

  #describe "delete one user" do
  #  before do
  #    @last = users.last
  #    delete "/api/users/#{@last.id}", headers: @last.create_new_auth_token
  #  end
  #  it "returns status code 204" do
  #    expect(response).to have_http_status(204)
  #  end
  #end

  # describe 'create one user avatar' do
  #  before {
  #    post "/api/users/#{user_id}/avatar", headers: users.last.create_new_auth_token,
  #                                         params: {'avatar': File.open(File.join(Rails.root, "/public/images/image.jpg"))}
  #  }
  #
  #  it 'returns status code 200' do
  #    expect(response).to have_http_status(200)
  #  end
  # end
end
