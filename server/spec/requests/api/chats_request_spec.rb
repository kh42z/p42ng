# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Chats', type: :request do

  describe '#get' do
    before { @chats = create_list(:chat, 2) }
    it "should show chats" do
      get api_chats_url
      assert_response :success
      expect(json.size).to eq(2)
    end
    it "should show chat" do
      chat_id = @chats.first.id
      get api_chat_url(chat_id)
      expect(response).to have_http_status(200)
      assert_equal @chats.first.privacy, json['privacy']
    end
  end

  describe '#post' do
    before {
      @user = create(:user)
      post api_chats_url, headers: @user.create_new_auth_token, params: { privacy: 1, password: "asd" }
    }
    it 'should return 201 created' do
      expect(response).to have_http_status(201)
    end
    it "current_user should be chat's owner" do
      expect(Chat.first.owner_id).to eq(@user.id)
    end
  end

  #  describe "GET request with wrong chat ID" do
  #    before { get "/api/chats/100" }
  #    it "returns error" do
  #      expect()
  #    end
  #
  #    it "returns status code 404" do
  #      expect(response).to have_http_status(404)
  #    end
  #  end

 describe '#delete' do
   it 'returns status code 204' do
     chat = create(:chat)
     delete "/api/chats/#{chat.id}"
     expect(response).to have_http_status(204)
   end
 end
end
