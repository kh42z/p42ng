require 'rails_helper'

RSpec.describe Chat, type: :model do
  it { should validate_presence_of(:privacy) }
  it { should validate_presence_of(:password) }
  it { should belong_to(:owner) }


  it "is not valid without attributes" do
    expect(Chat.new).to_not be_valid
  end

  it "is valid with valid attributes" do
    subject { described_class.new }
    subject.privacy = 1
    subject.password = "asd"
    subject.owner = create(:user)
    expect(subject).to be_valid
  end

  # it "is not valid with privacy => 1 and no password" do
  #   subject { described_class.new }
  #   subject.privacy = 1
  #   subject.owner = create(:user)
  #   expect(subject).to be_valid
  # end
end