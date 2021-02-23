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
        User.first.update(status: 'Online')
        get "/api/users", headers: first.create_new_auth_token, params: {status: 'Online'}
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
        patch "/api/users/#{user_id}", params: {"nickname" => "Michel"}, headers: users.last.create_new_auth_token
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
        patch "/api/users/#{user_id}", params: {"nickname" => "Gertrude"}, headers: users.last.create_new_auth_token
      end
      it "returns status code 422" do
        expect(response).to have_http_status(422)
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
        patch "/api/users/#{first.id}", params: {banned: true}, headers: users.last.create_new_auth_token
      end
      it "returns status code 403" do
        expect(response).to have_http_status(401)
      end
    end

    context "when admins bans an user" do
      before do
        users.last.update(admin: true)
        patch "/api/users/#{first.id}", params: {banned: true}, headers: users.last.create_new_auth_token
      end
      it "returns status code 200" do
        expect(response).to have_http_status(200)
      end
    end

    context "when admin modifies someone else" do
      before do
        users.last.update(admin: true)
        patch "/api/users/#{first.id}", params: {"nickname" => "George"}, headers: users.last.create_new_auth_token
      end
      it "returns status code 200" do
        expect(response).to have_http_status(200)
      end
    end
  end

  describe "delete one user" do
    before do
      @last = users.last
      delete "/api/users/#{@last.id}", headers: @last.create_new_auth_token
    end
    it "returns status code 204" do
      expect(response).to have_http_status(204)
    end
  end

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
