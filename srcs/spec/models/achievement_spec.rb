# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Achievement, type: :model do
  it 'should validate presence of attributes' do
    should validate_presence_of(:name)
    should validate_presence_of(:description)
  end

  it 'validates uniqueness of name' do
    should validate_uniqueness_of(:name)
  end
end
