# frozen_string_literal: true

require "rails_helper"

describe "Guild", type: :request do
  describe "#get" do
    it "should return guilds" do
      create_list(:guild, 2)
      get api_guilds_url
      expect(response).to have_http_status(:success)
      expect(Guild.count).to eq(2)
    end
    it "returns user" do
      guild = create(:guild)
      get api_guild_url(guild)
      expect(json).not_to be_empty
      expect(response).to have_http_status(200)
    end
  end

  describe "#post" do
    context "when the request is valid" do
      before {
        @user = create(:user)
        @params = attributes_for(:guild)
        post api_guilds_url, headers: @user.create_new_auth_token, params: @params
      }
      it "returns status code 201" do
        expect(response).to have_http_status(201)
      end

      it "current_user should be guild's owner" do
        expect(Guild.first.owner_id).to eq(@user.id)
      end
    end

    context "when the request is invalid" do
      before { post api_guilds_url }
      it "returns status code 422" do
        expect(response).to have_http_status(422)
      end
      it "returns a validation failure message" do
        expect(response.body).to match("can't be blank")
      end
    end
  end

 describe "#update" do
   it "should be updated" do
     user = create(:user)
     guild = create(:guild)
     valid_attributes = { name: "Updated", anagram: "upd4t", owner_id: user.id }
     put api_guild_url(guild.id), headers: user.create_new_auth_token, params: valid_attributes
     expect(Guild.first.name).to eq("Updated")
     expect(Guild.count).to eq(1)
     expect(response).to have_http_status(200)
   end
 end

 describe "#delete" do
   it "returns status code 204" do
     guild = create(:guild)
     delete api_guild_url(guild.id)
     expect(Guild.count).to eq(0)
     expect(response).to have_http_status(204)
   end
 end
end
