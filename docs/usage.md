| [Home](../README.md) |
|--------------------------------------------|

# Usage

The Record Distribution widget provides the ability to visualise records or items based on a specified grouping. For example, viewing the distribution of assets distribution by purdue levels, or the distribution of alerts by type, severity, etc.

- Ability to group records using a picklist, say "Levels" in the "Asset" module. The benefit of having a grouped view is that you can view all of the records together based on the grouping. In the case of our example, it would be to see how many assets are at each level. Additionally, it also provides a visual depiction of each record node in the group.
- Ability to add this view on a dashboard, report, or within the detail view of a module's record. 

An example of using the Record Distribution widget would be to display the assets grouped by their levels.

## Record Distribution Widget Views

### Record Distribution Widget Edit View

<img src="https://raw.githubusercontent.com/fortinet-fortisoar/widget-record-distribution/release/1.0.0/docs/media/editingRecordDistribution.png" alt="Configuring the Record Distribution Widget" style="border: 1px solid #A9A9A9; border-radius: 4px; padding: 10px; display: block; margin-left: auto; margin-right: auto;">

### Record Distribution Widget - Dashboard View

The following image displays a Record Distribution widget containing assets grouped by their levels on a Dashboard. It also includes visual lines that display the correlations between asset records grouped at various levels: 

<img src="https://raw.githubusercontent.com/fortinet-fortisoar/widget-record-distribution/release/1.0.0/docs/media/RecordDistributionView.png" alt="Displaying the Asset Distribution widget on a Dashboard" style="border: 1px solid #A9A9A9; border-radius: 4px; padding: 10px; display: block; margin-left: auto; margin-right: auto;">

### Record Distribution Widget - Module Detail View

The following image displays the Record Distribution widget containing alerts (that are linked to the asset record) grouped by their severity in the detail view of an asset record:

<img src="https://raw.githubusercontent.com/fortinet-fortisoar/widget-record-distribution/release/1.0.0/docs/media/RecordDistributionModuleView" alt="Displaying the Alert Distribution widget on a Asset record" style="border: 1px solid #A9A9A9; border-radius: 4px; padding: 10px; display: block; margin-left: auto; margin-right: auto;">

**Note**: If the asset record does not have any linked alerts, then the Record Distribution widget will display a '**No records found!**' message.

