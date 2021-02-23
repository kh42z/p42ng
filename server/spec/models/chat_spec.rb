require 'rails_helper'

RSpec.describe Chat, type: :model do
  it { should validate_presence_of(:privacy) }
  it { should allow_values('public', 'private', 'protected').for(:privacy) }
  it { should have_secure_password }
  it { should belong_to(:owner) }

  it "is not valid without attributes" do
    expect(Chat.new).to_not be_valid
  end

  it "is valid with valid attributes" do
    chat = create(:chat, privacy: 'public')
    chat.owner = create(:user)
    expect(chat).to be_valid
  end

  it "is not valid when set to protected without password" do
    expect { create(:chat, privacy: 'protected') }.to raise_error(ActiveRecord::RecordInvalid)
  end

  it "is valid when set to protected and a password" do
    subject { described_class.new }
    subject.privacy = 'protected'
    subject.password = "asd"
    subject.owner = create(:user)
    expect(subject).to be_valid
  end
end