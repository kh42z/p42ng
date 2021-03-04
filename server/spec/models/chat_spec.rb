require 'rails_helper'

RSpec.describe Chat, type: :model do
  it { should validate_presence_of(:name) }
  it { should validate_presence_of(:privacy) }
  it { should allow_values('public', 'private', 'protected').for(:privacy) }
  it { should have_secure_password }
  it { should belong_to(:owner) }

  it "is not valid without attributes" do
    expect(Chat.new).to_not be_valid
  end

  it "validates uniqueness of name" do
    create(:chat, name: 'unique')
    should validate_uniqueness_of(:name)
  end

  it "is not valid when set to protected without password" do
    expect { create(:chat, privacy: 'protected') }.to raise_error(ActiveRecord::RecordInvalid)
  end

  it "is valid when set to protected and a password" do
    subject { described_class.new }
    subject.name = 'Hop'
    subject.privacy = 'protected'
    subject.password = "asd"
    subject.owner = create(:user)
    expect(subject).to be_valid
  end
  it 'is valid without name if privacy == direct_message' do
    subject { described_class.new }
    subject.name = ''
    subject.privacy = 'direct_message'
    subject.owner = create(:user)
    expect(subject).to be_valid
  end
  it 'is not valid without name if privacy == public' do
    subject { described_class.new }
    subject.name = ''
    subject.privacy = 'public'
    subject.owner = create(:user)
    expect(subject).to_not be_valid
  end
end