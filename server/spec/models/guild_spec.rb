# frozen_string_literal: true

require 'rails_helper'

describe Guild, type: :model do
  it { should validate_presence_of(:name) }
  it { should validate_presence_of(:anagram) }
  it { should belong_to(:owner) }
  it { should validate_length_of(:anagram).is_equal_to(5) }

  it "validates uniqueness of name" do
    FactoryBot.create(:guild, name: 'unique')
    should validate_uniqueness_of(:name)
  end

  it "validates uniqueness of anagram" do
    FactoryBot.create(:guild, anagram: 'uniqu')
    should validate_uniqueness_of(:anagram)
  end

end
