require 'rails_helper'

RSpec.describe Message, type: :model do
  describe '#create' do
    it "can save with message" do
      expect(build(:message, image: nil)).to be_valid
    end

    it "can save with image" do
      expect(build(:message, text: nil)).to be_valid
    end
    
    it "can save with image and message" do
      expect(build(:message)).to be_valid
    end

    it "is invalid without message and image" do
      message = build(:message, text: nil, image: nil)
      message.valid?
      expect(message.errors[:text]).to include("を入力してください")
    end
    it "is invalid without message and group_id" do
      message = build(:message, group_id: nil)
      message.valid?
      expect(message.errors[:group]).to include("を入力してください")
    end
    it "is invalid without message and user_id" do
      message = build(:message, user_id: nil)
      message.valid?
      expect(message.errors[:user]).to include("を入力してください")
    end

  end
end