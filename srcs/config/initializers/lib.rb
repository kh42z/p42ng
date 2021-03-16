# frozen_string_literal: true

Dir["#{Rails.root}/lib/*.rb"].sort.each { |file| require file }
