| [Home](../README.md) |
|--------------------------------------------|

# Installation
1. To install a widget, click **Content Hub** > **Discover**.
2. From the list of widget that appears, search for and select **Record Distribution**.
3. Click the card of the **Record Distribution** widget.
4. Click **Install** on the bottom to begin installation.

# Configuration

## Record Distribution Widget Settings

The configuration settings of the Record Distribution widget is slightly different for dashboards or reports and the detail view of a module's detail view. The reason is that in the case of dashboards or reports, you can choose any module and view its view records based on the specified grouping. However, in the case of the detail view of a module's record, you can choose only those modules that are related to that module. 

Provide the following details to customize the Record Distribution  widget to suit your requirements:

| Fields                                   | Description                              |
| ---------------------------------------- | ---------------------------------------- |
| Title                                    | Specify the heading or title of the visual visual depiction of each record node in the group. |
| Select Data Source (Dashboards or Reports) OR <br />Select Related Data Source (View Panels) | Select the module (data source) whose records you want to group in Dashboards or Reports. For example, **Assets**. OR <br />Select the related module whose records you want to group in View Panels. |
| Picklist                                 | Select the picklist using which you want to group the records in the chosen module. For example, **Level**. |
| Picklist Items                           | Choose the items of the picklist to be displayed by the widget. By default all items of the selected picklist are populated in this field. For example, when you select Level as the Picklist, then the Picklist Items field get populated with all the items of the "Level" Picklist, i.e., Level 5.5, Level 5, Level 4, Level 3.5, Level 3, Level 2.5, Level 2, Level 1.5, and Level 1. You can now choose to remove the levels that you do not want the widget to display. |
| Show Correlation Edges                   | Select this option if you want visual lines to be added on the view to depict correlations between records from the same module that are grouped at various levels. |
| Record Assignment (Default Filter)       | Select **Only Me** to display only those records that are assigned to the logged-in user and based on the defined filters. <br />Select **All** to display all records based on the defined filters. |
| Assignment Fields                        | Select the field based on which records are assigned for the select module. |
| Filter Criteria                          | Define the filter criteria using which you want to filter the data retrieved by this widget, and ensuring that only requisite data gets fetched and displayed in this widget. <br />**NOTE**: A maximum of 100 records are fetched for rendering details. <br />For example, if you want the widget to display only those assets that are 'Active' and whose criticality is 'High' or 'Super High', you can define the filter criteria as shown in the following image:<br /><img src="https://raw.githubusercontent.com/fortinet-fortisoar/widget-record-distribution/release/1.0.0/docs/media/definingFilter.png" alt="Defining filters to restrict data fetched by the widget" style="border: 1px solid #A9A9A9; border-radius: 4px; padding: 10px; display: block; margin-left: auto; margin-right: auto;"> |
