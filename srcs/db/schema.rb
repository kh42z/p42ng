# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_03_11_090451) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "achievements", force: :cascade do |t|
    t.string "name"
    t.string "description"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "chat_messages", force: :cascade do |t|
    t.bigint "sender_id"
    t.bigint "chat_id"
    t.string "content"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["chat_id"], name: "index_chat_messages_on_chat_id"
    t.index ["sender_id"], name: "index_chat_messages_on_sender_id"
  end

  create_table "chat_participants", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "chat_id"
    t.integer "role", default: 0
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["chat_id"], name: "index_chat_participants_on_chat_id"
    t.index ["user_id", "chat_id"], name: "index_chat_participants_on_user_id_and_chat_id", unique: true
    t.index ["user_id"], name: "index_chat_participants_on_user_id"
  end

  create_table "chats", force: :cascade do |t|
    t.string "name"
    t.string "privacy", default: "private"
    t.string "password_digest"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "friendships", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "friend_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["friend_id"], name: "index_friendships_on_friend_id"
    t.index ["user_id", "friend_id"], name: "index_friendships_on_user_id_and_friend_id", unique: true
    t.index ["user_id"], name: "index_friendships_on_user_id"
  end

  create_table "games", force: :cascade do |t|
    t.bigint "winner_id"
    t.bigint "player_left_id"
    t.bigint "player_right_id"
    t.integer "connected_players", default: 0
    t.integer "war_time_id"
    t.string "status", default: "pending"
    t.string "mode"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["player_left_id"], name: "index_games_on_player_left_id"
    t.index ["player_right_id"], name: "index_games_on_player_right_id"
    t.index ["winner_id"], name: "index_games_on_winner_id"
  end

  create_table "guild_members", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "guild_id"
    t.integer "rank", default: 0
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["guild_id"], name: "index_guild_members_on_guild_id"
    t.index ["user_id"], name: "index_guild_members_on_user_id"
  end

  create_table "guilds", force: :cascade do |t|
    t.string "name"
    t.string "anagram", limit: 5, null: false
    t.integer "score", default: 0
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "ladders", force: :cascade do |t|
    t.string "name", null: false
    t.text "desc"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "user_achievements", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "achievement_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["achievement_id"], name: "index_user_achievements_on_achievement_id"
    t.index ["user_id"], name: "index_user_achievements_on_user_id"
  end

  create_table "user_ignores", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "ignored_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["ignored_id"], name: "index_user_ignores_on_ignored_id"
    t.index ["user_id", "ignored_id"], name: "index_user_ignores_on_user_id_and_ignored_id", unique: true
    t.index ["user_id"], name: "index_user_ignores_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "provider", default: "email", null: false
    t.string "uid", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.boolean "allow_password_change", default: false
    t.datetime "remember_created_at"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.string "name"
    t.string "nickname"
    t.string "image"
    t.string "email"
    t.json "tokens"
    t.boolean "two_factor", default: false
    t.string "two_factor_code_digest", null: false
    t.boolean "first_login", default: true
    t.boolean "admin", default: false
    t.boolean "banned", default: false
    t.integer "ladder_games_won", default: 0
    t.integer "ladder_games_lost", default: 0
    t.bigint "ladder_id"
    t.string "status", default: "offline"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["ladder_id"], name: "index_users_on_ladder_id"
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["uid", "provider"], name: "index_users_on_uid_and_provider", unique: true
  end

  create_table "war_addons", force: :cascade do |t|
    t.string "name"
    t.bigint "war_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["war_id"], name: "index_war_addons_on_war_id"
  end

  create_table "war_times", force: :cascade do |t|
    t.datetime "start"
    t.datetime "end"
    t.boolean "opened", default: false
    t.boolean "closed", default: false
    t.bigint "war_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["war_id"], name: "index_war_times_on_war_id"
  end

  create_table "wars", force: :cascade do |t|
    t.datetime "war_start"
    t.datetime "war_end"
    t.integer "prize"
    t.integer "from_score", default: 0
    t.integer "on_score", default: 0
    t.integer "max_unanswered"
    t.integer "last_negotiation"
    t.boolean "ladder_effort", default: false
    t.boolean "tournament_effort", default: false
    t.boolean "from_agreement", default: false
    t.boolean "on_agreement", default: false
    t.boolean "terms_agreed", default: false
    t.boolean "opened", default: false
    t.boolean "closed", default: false
    t.bigint "from_id"
    t.bigint "on_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["from_id"], name: "index_wars_on_from_id"
    t.index ["on_id"], name: "index_wars_on_on_id"
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "chat_messages", "chats"
  add_foreign_key "chat_messages", "users", column: "sender_id"
  add_foreign_key "chat_participants", "chats"
  add_foreign_key "chat_participants", "users"
  add_foreign_key "friendships", "users"
  add_foreign_key "friendships", "users", column: "friend_id"
  add_foreign_key "games", "users", column: "player_left_id"
  add_foreign_key "games", "users", column: "player_right_id"
  add_foreign_key "games", "users", column: "winner_id"
  add_foreign_key "guild_members", "guilds"
  add_foreign_key "guild_members", "users"
  add_foreign_key "user_achievements", "achievements"
  add_foreign_key "user_achievements", "users"
  add_foreign_key "user_ignores", "users"
  add_foreign_key "user_ignores", "users", column: "ignored_id"
  add_foreign_key "users", "ladders"
  add_foreign_key "war_addons", "wars"
  add_foreign_key "war_times", "wars"
  add_foreign_key "wars", "guilds", column: "from_id"
  add_foreign_key "wars", "guilds", column: "on_id"
end
