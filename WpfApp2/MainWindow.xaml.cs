using System.Text;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace WpfApp2
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
        }

        private void Importer2_Checked(object sender, RoutedEventArgs e)
        {
            Certificate1.IsEnabled = true;
            Certificate2.IsEnabled = true;
        }

        private void Importer2_Unchecked(object sender, RoutedEventArgs e)
        {
            Certificate1.IsEnabled = false;
            Certificate2.IsEnabled = false;
        }

        private void Button_Click(object sender, RoutedEventArgs e)
        {
            try
            {
                string engine_type;
                string entity_type;
                string certificate;

                if (Engine1.IsChecked == true)
                {
                    engine_type = "Gas";
                }
                else if (Engine2.IsChecked == true)
                {
                    engine_type = "Diesel";
                }
                else
                {
                    throw new Exception();
                }
                double size = Double.Parse(Size.Text);
                int year = int.Parse(Year.Text);
                double price = Double.Parse(Price.Text);
                string currency = Currency.Text;
                if (Importer1.IsChecked == true)
                {
                    entity_type = "Individual";
                }
                else if (Importer2.IsChecked == true)
                {
                    entity_type = "Entity";
                    if (Certificate1.IsChecked == true)
                    {
                        certificate = "No";
                    }
                    else if (Certificate2.IsChecked == true)
                    {
                        certificate = "Yes";
                    }
                    else
                    {
                        throw new Exception();
                    }
                }
                else
                {
                    throw new Exception();
                }

                Success.Visibility = Visibility.Visible;
                Error.Visibility = Visibility.Hidden;
            }
            catch (Exception ex)
            {
                Error.Content = ex.Message;
                Success.Visibility = Visibility.Hidden;
                Error.Visibility = Visibility.Visible;
            }
            
        }
    }
}