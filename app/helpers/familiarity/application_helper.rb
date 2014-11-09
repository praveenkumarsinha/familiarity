module Familiarity
  module ApplicationHelper
    def familiaritySwitchBoard
      content_tag('script') do
        raw "$(document).on(\"page:change\", function () {FamiliarityAdmin.familiaritySwitchBoard();});"
      end
    end

    def familiarityView(duration_in_days = 0.001)
      content_tag('script') do
        raw <<END_SQL
        var cn = 'familiarity_' + window.location.pathname.replace(/\\//g,'A');
        if (typeof $.cookie(cn) == "undefined")
          {
              var familiarity = new Familiarity();
              familiarity.familiarityView(true);
              console.log($.cookie(cn, new Date(), {
                  path: window.location.pathname,
                  expires: #{duration_in_days}
              }));
          }
END_SQL
      end
    end
  end
end
