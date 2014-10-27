require 'yaml' # Built in, no gem required
require_dependency "familiarity/application_controller"

module Familiarity
  class FamiliaritiesController < ApplicationController
    before_filter :load_familiarities_yml

    def index
    end

    def save
      File.open(@file_path, 'w+') { |f| f.write (@familiarities_hash.merge(params[:from_page] => params[:familiarity_hash])).to_yaml } #Store
      render nothing: true, status: 200
    end

    private
    def load_familiarities_yml
      @file_path = File.join(Rails.root, 'familiarities.yml')
      @familiarities_hash = ((YAML::load_file(@file_path) rescue nil)|| {})
    end
  end
end
