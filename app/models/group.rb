class Group < ApplicationRecord
 has_many :group_users
 has_many :users, through: :group_users
 validates :name, presence: true, uniqueness: true
 has_many :messages

 def show_last_message
  if (last_message = messages.last).present?
    last_message.text? ? last_message.text : "画像があるよ"
  else 
    'メッセージなし'
  end
 end
end
