# frozen_string_literal: true

require 'rails_helper'

RSpec.describe User, type: :model do
  it { should validate_presence_of(:nickname) }
  it { should validate_presence_of(:image_url) }
  it { should validate_presence_of(:two_factor) }
  it { should validate_presence_of(:mmr) }
  it { should belong_to(:ladder) }
  it { should belong_to(:guild) }
  it { should validate_presence_of(:status) }
end
