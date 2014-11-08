module Familiarity
  module ApplicationHelper
    def familiaritySwitchBoard
      content_tag('script') do
        raw "$(document).on(\"page:change\", function () {FamiliarityAdmin.familiaritySwitchBoard();});"
      end
    end
  end
end
