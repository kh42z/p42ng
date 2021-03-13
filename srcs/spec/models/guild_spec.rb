# frozen_string_literal: true

require 'rails_helper'

describe Guild, type: :model do
  it { should validate_presence_of(:name) }
  it { should validate_presence_of(:anagram) }
  it { should validate_length_of(:anagram).is_at_least(3) }
  it { should validate_length_of(:anagram).is_at_most(5) }

  it "should validate uniqueness" do
    create(:guild)
    should validate_uniqueness_of(:name)
    should validate_uniqueness_of(:anagram)
  end
  it "should validate length of anagram" do
   expect { create(:guild, anagram: 'ABC') }.to_not raise_error
  end
  it "should not validate length of too short anagram" do
    expect { create(:guild, anagram: 'AB') }.to raise_error(ActiveRecord::RecordInvalid, 'Validation failed: Anagram is too short (minimum is 3 characters)')
  end
  it "should not validate length of too long anagram" do
    expect { create(:guild, anagram: 'ABCDEF') }.to raise_error(ActiveRecord::RecordInvalid, 'Validation failed: Anagram is too long (maximum is 5 characters)')
  end
end
