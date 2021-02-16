# frozen_string_literal: true

require 'rails_helper'

RSpec.describe "ChatAdmins", type: :request do

  describe 'retrieves all chat admins' do
    let(:chats_admins) { create_list(:chat_with_admins, 2) }
    before do
      get api_chat_chat_admins_path(chats_admins)
    end
    it 'returns chat admins' do
      expect(json).not_to be_empty
      expect(json.size).to eq(2)
      expect(response).to have_http_status(200)
    end
  end

end
