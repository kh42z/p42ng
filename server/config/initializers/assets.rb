# frozen_string_literal: true

Rails.application.config.assets.paths << Rails.root.join('vendor', 'assets', 'bower_components')
Rails.application.config.assets.paths << Rails.root.join('assets', 'javascript')
