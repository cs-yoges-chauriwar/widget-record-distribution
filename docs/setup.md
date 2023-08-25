| [Home](../README.md) |
| -------------------- |

# Installation

1. To install a widget, click **Content Hub** > **Discover**.
2. From the list of widgets that appear, search for and select **Record Distribution**.
3. Click the **Record Distribution** widget card.
4. Click **Install** on the lower part of the screen to begin installation.

# Configuration

The configuration settings of the **Record Distribution** Widget for dashboards or reports is slightly different from the detail view of a module's detail view. 

In the case of dashboards or reports, you can choose any module and view its records based on the specified grouping. Whereas, in the case of the detail view of a module's record, you can choose only the related modules.

Following table helps customize the **Record Distribution** widget:

| Fields                                     | Description                                                                                                                                                                                                                     |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Title                                      | Specify a title for the visual depiction of each record node in the group.                                                                                                                                                      |
| Select Data Source (Dashboards or Reports) | Select the module whose records to group in a *Dashboard* or A *Report*.                                                                                                                                                        |
| Select Related Data Source (View Panels)   | Select the related module whose records to group in *View Panels*.                                                                                                                                                              |
| Picklist                                   | Select the picklist using which to group the records in the selected module.                                                                                                                                                    |
| Picklist Items                             | Choose the picklist items to be displayed by the widget.                                                                                                                                                                        |
| Icon for Record View                       | Select a field of type `Lookup` using which to display the icons representing asset records. For more information, refer to [set up modules to use icons that represent records](#setting-up-modules-to-use-icons-for-records). |
| Title for Record View <sup>New</sup>       | Specify title that appears under each icon in the Record distribution widget. You can configure the title widget to display values such as the *Name* or *IP address*.                                                          |
| Show Correlation Edges                     | Select this option to add visual lines on the view to depict correlations between records from the same module grouped at various levels.                                                                                       |
| Record Assignment (Default Filter)         | Select to display records that are assigned to the logged-in user or to display all records based on the defined filters.                                                                                                       |
| Assignment Fields                          | Select the field based on which records are assigned for the select module.                                                                                                                                                     |
| Filter Criteria                            | Define the filter criteria using which to filter the data retrieved by this widget.                                                                                                                                             |

## Setting up Modules to use Icons for Records

You can represent records in a module with the help of icons. The icons must be a part of a newly created module to which an existing module can link.

For the purposes of this document, as an example, we are going to:

1. Create a new module.

2. Give appropriate permissions.

3. Add in the navigation menu.

4. Add a field linking the new module with existing modules using a lookup.

5. Upload icons to the newly-created module.

### Creating a New Module

1. Create a new module **Asset Icons** to store icons that represent the various assets such as laptops, desktops, servers, or mobile devices.

    Refer to FortiSOAR&trade; product documentation for more information on [Creating a New Module](https://docs.fortinet.com/document/fortisoar/7.4.1/administration-guide/97786/application-editor#Creating_a_New_Module).

2. Create a new field **Icon Name** containing unique names for icons to use.

    | Field Name    | Value        |
    | ------------- | ------------ |
    | `Field Type`  | *Text*       |
    | `Sub Type`    | *Text Field* |
    | `Field Title` | *Icon Name*  |

3. Create another field **Icon**. This field stores the actual icons.

    | Field Name    | Value        |
    | ------------- | ------------ |
    | `Field Type`  | *File Field* |
    | `Field Title` | *Icon*       |

4. Create another field **Description**. This field contains some description about the module.

    | Field Name    | Value         |
    | ------------- | ------------- |
    | `Field Type`  | *Text*        |
    | `Sub Type`    | *Text Field*  |
    | `Field Title` | *Description* |


    <table>
        <td><strong>NOTE</strong></td><td>Review the <strong>Fields Editor</strong> to ensure that the fields appear in the intended sequence.</td>
    </table>

5. Specify **Asset Icon** under *Singular* in *Module Name*. The *Plural* field auto-populates with a plural. You can edit this field, if required.

6. Select **Icon Name** as *Display Template*.

7. Specify **Icon Name** as the uniqueness constraint in the *Record Uniqueness* field.

8. Click **Save** and **Publish All Modules** to save and apply the changes.

### Assigning Permissions

To select this newly-created module to an existing module, you must assign this module full app permissions:

1. Click **Settings** > **Roles** to open the *Roles* page.

2. Click the **Full App Permissions** role to edit it.

3. Find and locate your newly-created module.

4. Click **+** to assign create, read, update, and delete (CRUD) permissions.

5. Click **Save** to save and apply the changes.

### Adding to the Navigation Bar

1. Add the module **Asset Icons** to the navigation bar.

2. Assign an icon for it to appear distinctly in the navigation bar.

3. Click **Save** to save the changes.

Refer to [Modifying the Navigation bar](https://docs.fortinet.com/document/fortisoar/7.4.1/administration-guide/97786/application-editor#Modifying_the_Navigation_bar) in FortiSOAR&trade; product documentation for more information.

### Linking the new Module to Existing Modules

1. Open the existing **Assets** module.

2. Create a new field **Asset Icon** within the **Asset Module**.

    | Field Name       | Value                                |
    | ---------------- | ------------------------------------ |
    | `Field Type`     | *Lookup (One to Many or One to One)* |
    | `Related Module` | *Asset Icons*                        |
    | `Field Title`    | *Asset Icon*                         |

### Uploading Icons to the New Module

After you have set up the new **Asset Icons** module and updated the **Assets** module to display the new lookup field, add the relevant icons.

1. Click to open the **Asset Icons** from the navigation menu.

2. Click **Add +** on the **Asset Icons** page.

3. Enter **Server** in the **Icon Name** field.

3. Drag-and-drop an icon file. Alternatively, you can browse to the icon file and select to upload it.

4. Enter the description of the asset type in the **Description** field.

5. Click **Save** to save the record.

Add this widget in any of the views to see the uploaded icons.

| [Usage](./usage.md) |
| ------------------- |