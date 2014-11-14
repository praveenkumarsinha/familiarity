module Familiarity
  module ApplicationHelper
    def familiaritySwitchBoard
      content_tag('script') do
        # raw "$(document).on(\"page:change\", function () {FamiliarityAdmin.familiaritySwitchBoard();});"
        raw "FamiliarityAdmin.familiaritySwitchBoard();"
      end
    end

    def familiarityView(options={})
      _options= {
          escape_to_exit: true,
          f1_to_start: true,
          show_tips_recursively: false,
          mandatory_all_tips: true,
          traverse_back: true,
          remember_duration: 30 #In Days
      }.merge(options)

      content_tag('script') do
        raw <<END_SCRIPT
        var cn = 'familiarity_' + '#{request.path}'.replace(/\\//g,'A');
        var familiarity = new Familiarity(#{_options.to_json});
        if (typeof $.cookie(cn) == "undefined")
          {
              familiarity.familiarityView(true);
              console.log($.cookie(cn, new Date(), { expires: #{_options[:remember_duration]} }));
          }
END_SCRIPT
      end
    end
  end
end
