# frozen_string_literal: true

require 'rails_helper'

describe Guild, type: :model do
  it { should validate_presence_of(:name) }
  it { should validate_presence_of(:anagram) }
  it { should belong_to(:owner) }
  it { should validate_length_of(:anagram).is_equal_to(5) }
  describe "name && anagram uniqueness" do
    let!(:users) { create_list(:user, 10) }
    let!(:guilds) { create_list(:guild, 10) }
    it { should validate_uniqueness_of :name }
    it { should validate_uniqueness_of :anagram }
  end
end
