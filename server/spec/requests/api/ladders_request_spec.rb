require "rails_helper"

RSpec.describe "Ladders", type: :request do
  let!(:ladders) { create_list(:ladder, 5) }
  let(:user_id) { ladder.first.id }
  describe "retrieves all ladders" do
    before { get "/api/ladders" }

    it "returns users" do
      expect(json).not_to be_empty
      expect(json.size).to eq(5)
    end

    it "returns status code 200" do
      expect(response).to have_http_status(200)
    end
  end
end

