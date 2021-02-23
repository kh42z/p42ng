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

ActiveRecord::Schema.define(version: 2021_02_22_110141) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "achievements", force: :cascade do |t|
    t.string "name"
    t.string "description"
    t.bigint "user_achievement_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_achievement_id"], name: "index_achievements_on_user_achievement_id"
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

  create_table "chat_admins", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "chat_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["chat_id"], name: "index_chat_admins_on_chat_id"
    t.index ["user_id"], name: "index_chat_admins_on_user_id"
  end

  create_table "chat_bans", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "chat_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["chat_id"], name: "index_chat_bans_on_chat_id"
    t.index ["user_id"], name: "index_chat_bans_on_user_id"
  end

  create_table "chat_participants", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "chat_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["chat_id"], name: "index_chat_participants_on_chat_id"
    t.index ["user_id"], name: "index_chat_participants_on_user_id"
  end

  create_table "chat_timeouts", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "chat_id"
    t.datetime "timeout"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["chat_id"], name: "index_chat_timeouts_on_chat_id"
    t.index ["user_id"], name: "index_chat_timeouts_on_user_id"
  end

  create_table "chats", force: :cascade do |t|
    t.string "privacy", default: "public"
    t.string "password_digest"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "owner_id"
    t.index ["owner_id"], name: "index_chats_on_owner_id"
  end

  create_table "friendships", force: :cascade do |t|
    t.bigint "friend_a_id"
    t.bigint "friend_b_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["friend_a_id"], name: "index_friendships_on_friend_a_id"
    t.index ["friend_b_id"], name: "index_friendships_on_friend_b_id"
  end

  create_table "game_invitations", force: :cascade do |t|
    t.bigint "player1_id"
    t.bigint "player2_id"
    t.bigint "game_type_id"
    t.string "from"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["game_type_id"], name: "index_game_invitations_on_game_type_id"
    t.index ["player1_id"], name: "index_game_invitations_on_player1_id"
    t.index ["player2_id"], name: "index_game_invitations_on_player2_id"
  end

  create_table "game_types", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "games", force: :cascade do |t|
    t.bigint "winner_id"
    t.bigint "player_left_id"
    t.bigint "player_right_id"
    t.bigint "game_type_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["game_type_id"], name: "index_games_on_game_type_id"
    t.index ["player_left_id"], name: "index_games_on_player_left_id"
    t.index ["player_right_id"], name: "index_games_on_player_right_id"
    t.index ["winner_id"], name: "index_games_on_winner_id"
  end

  create_table "guild_officers", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "guild_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["guild_id"], name: "index_guild_officers_on_guild_id"
    t.index ["user_id"], name: "index_guild_officers_on_user_id"
  end

  create_table "guilds", force: :cascade do |t|
    t.string "name"
    t.string "anagram", limit: 5, null: false
    t.integer "score"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "owner_id"
    t.index ["owner_id"], name: "index_guilds_on_owner_id"
  end

  create_table "ladders", force: :cascade do |t|
    t.string "name", null: false
    t.text "desc"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "states", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "user_achievements", force: :cascade do |t|
    t.bigint "user_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_user_achievements_on_user_id"
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
    t.string "image_url"
    t.boolean "two_factor", default: false
    t.boolean "first_login", default: true
    t.boolean "admin", default: false
    t.boolean "banned", default: false
    t.integer "ladder_games_won", default: 0
    t.integer "ladder_games_lost", default: 0
    t.bigint "ladder_id"
    t.bigint "guild_id"
    t.bigint "state_id", default: 1
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["guild_id"], name: "index_users_on_guild_id"
    t.index ["ladder_id"], name: "index_users_on_ladder_id"
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["state_id"], name: "index_users_on_state_id"
    t.index ["uid", "provider"], name: "index_users_on_uid_and_provider", unique: true
  end

  create_table "war_addons", force: :cascade do |t|
    t.string "name"
    t.bigint "war_term_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["war_term_id"], name: "index_war_addons_on_war_term_id"
  end

  create_table "war_terms", force: :cascade do |t|
    t.datetime "start"
    t.datetime "end"
    t.boolean "ladder", default: false
    t.boolean "agreed", default: false
    t.bigint "war_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["war_id"], name: "index_war_terms_on_war_id"
  end

  create_table "war_times", force: :cascade do |t|
    t.datetime "start"
    t.datetime "end"
    t.bigint "war_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["war_id"], name: "index_war_times_on_war_id"
  end

  create_table "wars", force: :cascade do |t|
    t.integer "from"
    t.integer "on"
    t.datetime "war_start"
    t.datetime "war_end"
    t.integer "prize"
    t.integer "from_score", default: 0
    t.integer "on_score", default: 0
    t.integer "max_unanswered"
    t.bigint "guild_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["guild_id"], name: "index_wars_on_guild_id"
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "chat_admins", "chats"
  add_foreign_key "chat_admins", "users"
  add_foreign_key "chat_bans", "chats"
  add_foreign_key "chat_bans", "users"
  add_foreign_key "chat_participants", "chats"
  add_foreign_key "chat_participants", "users"
  add_foreign_key "chat_timeouts", "chats"
  add_foreign_key "chat_timeouts", "users"
  add_foreign_key "chats", "users", column: "owner_id"
  add_foreign_key "friendships", "users", column: "friend_a_id"
  add_foreign_key "friendships", "users", column: "friend_b_id"
  add_foreign_key "game_invitations", "game_types"
  add_foreign_key "game_invitations", "users", column: "player1_id"
  add_foreign_key "game_invitations", "users", column: "player2_id"
  add_foreign_key "games", "game_types"
  add_foreign_key "games", "users", column: "player_left_id"
  add_foreign_key "games", "users", column: "player_right_id"
  add_foreign_key "games", "users", column: "winner_id"
  add_foreign_key "guild_officers", "guilds"
  add_foreign_key "guild_officers", "users"
  add_foreign_key "guilds", "users", column: "owner_id"
  add_foreign_key "users", "guilds"
  add_foreign_key "users", "ladders"
  add_foreign_key "users", "states"
  add_foreign_key "wars", "guilds"
end
