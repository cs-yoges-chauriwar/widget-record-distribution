| [Home](../README.md) |
|--------------------------------------------|

# Usage

The Record Distribution widget provides the ability to visualise records or items based on a specified grouping. For example, viewing the distribution of assets distribution by purdue levels, or the distribution of alerts by type, severity, etc.

- Ability to group records using a picklist, say "Levels" in the "Asset" module. The benefit of having a grouped view is that you can view all of the records together based on the grouping. In the case of our example, it would be view assets at each level. Additionally, it also provides a visual depiction of each record node in the group.
- Ability to add this view on a dashboard, report, or within the detail view of a module's record. 

An example of using the Record Distribution widget would be to display the assets grouped by their levels.

## Features

- Allows users to visualise items or records based on the specified grouping.
- Allows users to configure the widget by choosing module-wise picklists and specifying filters to ensure that the widget retrieves the necessary data.  
  **Note**: A maximum of 100 records are fetched for rendering details.
- Allows users to add visual lines to view correlations between records from the same module that are grouped at various levels. 

## Record Distribution Widget Views

### Record Distribution Widget Edit View

<img src="https://raw.githubusercontent.com/fortinet-fortisoar/widget-record-distribution/release/1.0.0/docs/media/editingRecordDistribution.png" alt="Configuring the Record Distribution Widget" style="border: 1px solid #A9A9A9; border-radius: 4px; padding: 10px; display: block; margin-left: auto; margin-right: auto;">

### Record Distribution Widget - Dashboard View

The following image displays a Record Distribution widget based on our example, i.e., you can view assets grouped by their levels on a Dashboard. It also includes visual lines that display the correlations between asset records grouped at various levels: 

<img src="https://raw.githubusercontent.com/fortinet-fortisoar/widget-record-distribution/release/1.0.0/docs/media/RecordDistributionView.png" alt="Displaying the Asset Distribution widget on a Dashboard" style="border: 1px solid #A9A9A9; border-radius: 4px; padding: 10px; display: block; margin-left: auto; margin-right: auto;">

Click **View All Records** to view a list view of all records that are filtered as per the grouping criteria. In our example, clicking View All Records displays a list of all asset records filtered as per their level, for example, all asset records at 'Level 5'. This is required since a maximum of 100 records are fetched for rendering details.

### Record Distribution Widget - Module Detail View

The following image displays the Record Distribution widget based on our example, i.e., you can view alerts (that are linked to the asset record) grouped by their severity in the detail view of an asset record:

<img src="https://raw.githubusercontent.com/fortinet-fortisoar/widget-record-distribution/release/1.0.0/docs/media/RecordDistributionModuleView.png" alt="Displaying the Alert Distribution widget on a Asset record" style="border: 1px solid #A9A9A9; border-radius: 4px; padding: 10px; display: block; margin-left: auto; margin-right: auto;">

**Note**: If the asset record does not have any linked alerts, then the Record Distribution widget will display a '**No records found!**' message.
