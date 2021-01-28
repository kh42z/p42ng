# frozen_string_literal: true

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Ladder.create(name: 'Bronze', desc: 'meh.', mmr_threshold: 200)
Ladder.create(name: 'Silver', desc: 'hem.', mmr_threshold: 400)
Ladder.create(name: 'Gold', desc: 'ehm.', mmr_threshold: 600)
Ladder.create(name: 'Platine', desc: 'mhe.', mmr_threshold: 800)
Ladder.create(name: 'Diamond', desc: 'mhe.', mmr_threshold: 1000)
